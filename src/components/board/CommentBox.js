import React, { useState } from 'react';
import { Card, ListGroup, Form, Button, Badge } from 'react-bootstrap';
import { request } from '../../helpers/axios_helper';

function CommentBox({ showComments, selectedPostId, comments }) {
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = () => {
        // 새로운 댓글 데이터 생성
        const commentData = {
            comment: newComment,
            postId: selectedPostId
        };

        // API를 통해 댓글 등록 요청
        request("POST", "/posts/comments", commentData)
            .then(response => {
                // 댓글이 성공적으로 등록된 경우
                if (response.data) {
                    // 댓글 목록을 다시 불러오기
                    // 여기서는 새로고침 없이 댓글 목록을 업데이트하는 방식을 사용할 수도 있습니다.
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error adding comment:', error);
                // 실패한 경우에 대한 처리
            });
    };

    return (
        <div style={{
            width: '25%',
            position: 'fixed',
            right: showComments ? 0 : '-25%',
            top: 0,
            bottom: 0,
            backgroundColor: 'lightgray',
            overflowY: 'auto',
            transition: 'right 0.3s ease-in-out'
        }}>
            <Card style={{ height: '100%' }}>
                <Card.Body style={{ height: '100%' }}>
                    <Card.Title>{selectedPostId}번 게시글의 댓글</Card.Title>
                    <ListGroup variant="flush">
                        {comments.map((comment, index) => (
                            <ListGroup.Item key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{comment.comment}</span>
                                    <Badge pill variant="secondary">{comment.loginId}</Badge>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem' }}>
                                    작성일: {new Date(comment.createdDate).toLocaleString()}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form className="mt-3">
                        <Form.Group controlId="comment">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="댓글을 입력하세요"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleCommentSubmit}>댓글 등록</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CommentBox;
