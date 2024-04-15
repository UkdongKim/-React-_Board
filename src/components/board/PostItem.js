import React, { useState } from 'react';

function PostItem({ post }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleMouseEnter = () => {
        setIsSelected(true);
    };

    const handleMouseLeave = () => {
        setIsSelected(false);
    };

    const handleClick = (event) => {
        event.preventDefault(); // 기본 동작 막기
        setIsSelected(!isSelected);
    };

    const cardStyle = {
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
        border: isSelected ? '2px solid #007bff' : 'none' // 선택되었을 때 테두리 추가
    };

    return (
        <div className="card mx-auto"
             style={cardStyle}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
             onClick={handleClick}>
            <div className="card-body text-center">
                <h2 className="card-title">{post.title}</h2>
                <h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
                <p className="card-text">{post.content}</p>
            </div>
        </div>
    );
}

export default PostItem;
