package com.sowab.linkedin.features.feed.service;

import com.sowab.linkedin.features.authentication.model.AuthenticationUser;
import com.sowab.linkedin.features.authentication.repository.AuthenticationUserRepository;
import com.sowab.linkedin.features.feed.dto.PostDto;
import com.sowab.linkedin.features.feed.model.Comment;
import com.sowab.linkedin.features.feed.model.Post;
import com.sowab.linkedin.features.feed.repository.CommentRepository;
import com.sowab.linkedin.features.feed.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final AuthenticationUserRepository userRepository;

    public FeedService(PostRepository postRepository, CommentRepository commentRepository, AuthenticationUserRepository userRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(PostDto postDto, Long authorId) {
        AuthenticationUser author = userRepository.findById(authorId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        Post post = new Post(postDto.getContent(), author);
        post.setPicture(postDto.getPicture());
        return postRepository.save(post);
    }

    public Post editPost(Long postId, Long userId, PostDto postDto) {
        Post post = postRepository.findById(postId).orElseThrow(()-> new IllegalArgumentException("Post not found."));

        if(!post.getAuthor().getId().equals(userId)) {
            throw new IllegalArgumentException("User is not the author of the post.");
        }

        post.setContent(postDto.getContent());
        post.setPicture(postDto.getPicture());

        return postRepository.save(post);
    }

    public List<Post> getFeedPosts(Long authenticatedUserId) {
        return postRepository.findByAuthorIdNotOrderByCreationDateDesc(authenticatedUserId);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreationDateDesc();
    }

    public Post getPost(Long postId) {
        return postRepository.findById(postId).orElseThrow(()-> new IllegalArgumentException("Post not found."));
    }

    public void deletePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found."));
//        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        if(!post.getAuthor().getId().equals(userId)) {
            throw new IllegalArgumentException("User is not the author of the post.");
        }
        postRepository.delete(post);
    }

    public List<Post> getPostByUserId(Long userId) {
        return postRepository.findByAuthorId(userId);
    }

    public Post likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found."));
        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));

        if(post.getLikes().contains(user)) {
            post.getLikes().remove(user);
        } else {
            post.getLikes().add(user);
        }

        return postRepository.save(post);
    }

    public Comment addComment(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found."));
        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        Comment comment = new Comment(post, user, content);
        return commentRepository.save(comment);
    }

    public Comment editComment(Long commentId, Long userId, String content) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment not found."));
        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        if(!comment.getAuthor().equals(user)) {
            throw new IllegalArgumentException("User is not the author of the comment.");
        }
        comment.setContent(content);
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment not found."));
        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        if(!comment.getAuthor().equals(user)) {
            throw new IllegalArgumentException("User is not the author of the comment.");
        }
        commentRepository.delete(comment);
    }

    public List<Comment> getPostComments(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found."));
        return post.getComments();
    }
}
