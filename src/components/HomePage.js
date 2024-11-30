// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VietnamMap from './VietnamMap';
import './style.css'; // Import your CSS for styling

const HomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to handle button click
    const handleButtonClick = () => {
      navigate('/forum'); // Navigate to /forum when button is clicked
    };
    
return (
    <div className="homepage">
        {/* Navigation Bar */}
        <div className="navbar">
            <div className="logo">Group 2</div>
            <div className="nav-links">
                <Link to="/home" className="active">Trang Chủ</Link>
                <Link to="/forum" id="forum-link">Diễn Đàn</Link>
                <a>Kết Nối Bản Địa</a>
                <a>Lên Kế Hoạch Tour Ẩm Thực</a>
                <a>Bảng Giá</a>
            </div>
            <div className="auth-links">
                <a>Đăng Ký</a>
                <a>Đăng Nhập</a>
            </div>
      </div>

        {/* Introduction Section */}
        <div className="intro-container">
            <h1>Khám phá Ẩm thực Việt</h1>
            <p>
            Khám phá ẩm thực Việt Nam qua từng vùng miền là một hành trình không thể bỏ qua. Từ những món ăn truyền thống của miền Bắc như phở, bún chả, đến các món đặc sản miền Trung như bún bò Huế, cơm hến, hay hương vị đậm đà của cơm tấm và hủ tiếu miền Nam. Chức năng "Diễn đàn" cho phép bạn kết nối và thảo luận với những người đam mê ẩm thực từ khắp mọi miền đất nước. Bạn có thể chia sẻ những món ăn yêu thích, học hỏi bí quyết nấu nướng, hoặc đơn giản là thảo luận về những địa điểm ăn uống ngon lành. Đây là cơ hội tuyệt vời để khám phá thêm những món ăn mới lạ và cùng bạn bè trải nghiệm sự đa dạng của nền ẩm thực Việt Nam.
            </p>
            <p>
            Khám phá ẩm thực qua lời kể của những người dân bản địa sẽ giúp bạn hiểu rõ hơn về hương vị và câu chuyện phía sau mỗi món ăn. Bạn sẽ có thể nghe những câu chuyện thú vị về các món ăn, tìm hiểu nguồn gốc và các truyền thống ẩm thực lâu đời, đồng thời có cơ hội giao lưu và kết nối với người dân địa phương, qua đó làm phong phú thêm hành trình khám phá văn hóa ẩm thực của mình.
            </p>
            <p>
            Với tính năng "Lên Kế Hoạch Tour Ẩm Thực", bạn có thể dễ dàng lên kế hoạch cho một hành trình khám phá ẩm thực hoàn hảo. Dù bạn đang tìm kiếm một tour ăn uống tại một thành phố, hay chỉ đơn giản là muốn khám phá các món ăn đặc trưng của một vùng miền, chức năng này giúp bạn lên lịch trình chi tiết với các địa điểm ăn uống hấp dẫn và các món ăn không thể bỏ qua. Tận hưởng một chuyến đi ẩm thực đầy thú vị và khó quên ngay hôm nay!
            </p>
        </div>

        {/* Question Section */}
        <div class="question-container">
            <h2>Bạn muốn khám phá gì?</h2>
            <div class="buttons">
                <button id="regions-exploration">Bạn muốn đi đâu?</button>
                <button id="discussion" onClick={handleButtonClick}>Cộng đồng</button>
                <button id="local-matching">Kết Nối Với Người Bản Địa</button>
                <button id="food-tour-planning">Lên Kế Hoạch Tour Ẩm Thực</button>
            </div>
        </div>

        <div class="map-wrapper">
            <div class="map-container" id="map">
                <div id="svg-container"></div>
                <div id="tooltip" class="tooltip"></div>
            </div>

            <div class="info-container">
                <h2>Đây là bản đồ Việt Nam...</h2>
                <p>Nơi bạn có thể dễ dàng tương tác và khám phá các điểm đến ẩm thực đặc trưng của từng vùng miền. Chỉ cần nhập tên địa phương bạn muốn tìm, bản đồ sẽ hiển thị các địa điểm nổi bật để bạn lựa chọn. Khi bạn nhấp vào một địa phương, bạn sẽ nhận được những thông tin thú vị về các món ăn đặc sản của khu vực đó, các mẹo vặt về cách chế biến, cũng như những câu chuyện văn hóa liên quan đến ẩm thực tại địa phương đó. Hãy bắt đầu hành trình khám phá ẩm thực Việt Nam ngay hôm nay!</p>

                <div class="search-container">
                    <input type="text" id="region-search" placeholder="Nhập nơi bạn muốn tới..." />
                    <button id="search-button">Tìm kiếm</button>
                </div>
            </div>
        </div>

        <div id="region-modal" class="modal">
            <div class="modal-content">
                <span id="close-modal" class="close">&times;</span>
                <p id="modal-content">Region information will appear here.</p>
            </div>
        </div>

        <div className="map-container">
            <VietnamMap /> {/* Embed the VietnamMap component */}
        </div>
    </div>
    );
};

export default HomePage;
