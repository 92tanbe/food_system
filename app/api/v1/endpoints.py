from datetime import datetime
import os
from fastapi import APIRouter, Response, UploadFile, File, HTTPException
from app.utils.camera import generate, get_capture
from fastapi.responses import StreamingResponse
import io
from PIL import Image
from app.utils.db import get_db, serialize_mongo_document

router = APIRouter()

save_dir = "./images"


@router.post("/capture")
async def capture(file: UploadFile = File(...)):
    # Nhận file ảnh từ frontend
    image_data = await file.read()
    os.makedirs(save_dir, exist_ok=True)
    filename = datetime.now().strftime("%Y%m%d_%H%M%S") + "_" + file.filename
    save_path = os.path.join(save_dir, filename)
    with open(save_path, "wb") as f:
        f.write(image_data)

    # Xử lý ảnh (nhận diện món ăn, tính calo, etc.)
    # Ví dụ: mở ảnh bằng PIL
    image = Image.open(io.BytesIO(image_data))
    
    # TODO: Thêm logic AI/ML để phân tích ảnh và lưu kết quả nếu cần

    # Truy vấn dữ liệu thực từ MongoDB
    try:
        db = get_db()
        # Ví dụ: lấy cấu trúc dinh dưỡng của món ăn gần nhất hoặc danh sách món ăn
        # Tuỳ dữ liệu của bạn, thay thế tên collection và tiêu chí truy vấn
        foods_cursor = db["foods"].find().limit(20)
        foods = [serialize_mongo_document(doc) for doc in foods_cursor]

        # Nếu muốn tổng hợp calo
        total_calories = sum(doc.get("calories", 0) for doc in foods)

        return {
            "success": True,
            "detected_foods": foods,
            "total_calories": total_calories
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi truy vấn MongoDB: {e}")


@router.get('/video_feed')
def video_feed():
    return StreamingResponse(generate(), media_type='multipart/x-mixed-replace; boundary=frame')

@router.get("/proxy_capture")
def proxy_capture():
    content = get_capture()
    return Response(content=content, media_type="image/jpeg")