import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';
import { Container, Form, Button, Card } from 'react-bootstrap'; // 부트스트랩 컴포넌트 임포트

function Board() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({title: '', content: ''});
    const [editMode, setEditMode] = useState(null);
    const [updatedPost, setUpdatedPost] = useState({title: '', content: ''});

    // 게시글 목록 불러오기
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        request(
            "GET",
            "/api/v1/posts",
            {}).then(
            (response) => {
                console.dir(response)
                setPosts(response.data)
            })
    };

    // 게시글 추가
    const addPost = () => {
        request("POST", "/api/v1/posts", newPost)
            .then(response => {
                if (response.data > 0) {
                    setPosts([...posts, {...newPost, id: response.data}]);
                    setNewPost({title: '', content: ''});
                    alert('게시글이 성공적으로 등록되었습니다.');
                } else {
                    alert('게시글을 등록하는데 문제가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error adding post:', error);
                alert('게시글을 등록하는데 문제가 발생했습니다.');
            });
    };

    // 게시글 삭제
    const deletePost = (id) => {
        request("DELETE", `/api/v1/posts/${id}`)
            .then(response => {
                const deletedPostId = response.data;
                if (deletedPostId === id) {
                    setPosts(posts.filter(post => post.id !== deletedPostId));
                    alert('게시글이 성공적으로 삭제되었습니다.');
                } else {
                    alert('게시글을 삭제하는데 문제가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                alert('게시글을 삭제하는데 문제가 발생했습니다.');
            });
    };

    // 게시글 수정
    const startEditMode = (id) => {
        setEditMode(id);
        const postToEdit = posts.find(post => post.id === id);
        setUpdatedPost({title: postToEdit.title, content: postToEdit.content});
    };

    const cancelEditMode = () => {
        setEditMode(null);
        setUpdatedPost({title: '', content: ''});
    };

    const updatePost = (id) => {
        request("PUT", `/api/v1/posts/${id}`, updatedPost)
            .then(response => {
                const updatedPostId = response.data;
                if (updatedPostId === id) {
                    const updatedPosts = posts.map(post => (post.id === id ? {...post, ...updatedPost} : post));
                    setPosts(updatedPosts);
                    setEditMode(null);
                    setUpdatedPost({title: '', content: ''});
                    alert('게시글이 성공적으로 수정되었습니다.');
                } else {
                    alert('게시글을 수정하는데 문제가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error updating post:', error);
                alert('게시글을 수정하는데 문제가 발생했습니다.');
            });
    };

    return (
        <Container>
            <h2 className="mt-4">게시판</h2>
            <Form className="mb-4">
                <Form.Group controlId="title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    />
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="내용을 입력하세요"
                        value={newPost.content}
                        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    />
                </Form.Group>
                <Button variant="primary" onClick={addPost}>게시글 추가</Button>
            </Form>
            <div>
                {posts.map(post => (
                    <Card key={post.id} className="mb-3">
                        <Card.Body>
                            {editMode === post.id ? (
                                <div className="update-form">
                                    <Form.Group controlId="title">
                                        <Form.Label>제목</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updatedPost.title}
                                            onChange={(e) => setUpdatedPost({...updatedPost, title: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="content">
                                        <Form.Label>내용</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            value={updatedPost.content}
                                            onChange={(e) => setUpdatedPost({...updatedPost, content: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => updatePost(post.id)}>완료</Button>
                                    <Button variant="secondary" onClick={cancelEditMode}>취소</Button>
                                </div>
                            ) : (
                                <div>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                    <Button variant="info" onClick={() => startEditMode(post.id)}>수정</Button>
                                    <Button variant="danger" onClick={() => deletePost(post.id)}>삭제</Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>


    )
}

export default Board;
