package com.sowab.linkedin.features.feed.repository;

import com.sowab.linkedin.features.feed.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
