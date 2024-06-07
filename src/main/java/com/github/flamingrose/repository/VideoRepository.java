package com.github.flamingrose.repository;

import com.github.flamingrose.domain.Video;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findOneByCodeIgnoreCase(String code);
}
