package com.github.flamingrose.service;

import com.github.flamingrose.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
public class VideoService {

    private static final Logger Logger = LoggerFactory.getLogger(VideoService.class);

    private final VideoRepository videoRepository;
    private final CacheManager cacheManager;

    public VideoService(VideoRepository videoRepository, CacheManager cacheManager) {
        this.videoRepository = videoRepository;
        this.cacheManager = cacheManager;
    }
}
