package com.github.flamingrose.web.rest;

import com.github.flamingrose.domain.Video;
import com.github.flamingrose.repository.VideoRepository;
import com.github.flamingrose.security.AuthoritiesConstants;
import com.github.flamingrose.service.VideoService;
import jakarta.validation.Valid;
import java.net.URISyntaxException;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList("id", "name", "code", "pic", "url", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate")
    );

    private final Logger logger = LoggerFactory.getLogger(VideoController.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VideoService videoService;

    private final VideoRepository videoRepository;

    public VideoController(VideoService videoService, VideoRepository videoRepository) {
        this.videoService = videoService;
        this.videoRepository = videoRepository;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Video> add(@Valid @RequestBody Video video) throws URISyntaxException {
        return ResponseEntity.ok().body(videoRepository.save(video));
    }

    @PutMapping({ "/update", "/update/{id}" })
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Video> updateUser(@PathVariable(name = "id", required = false) Long id, @Valid @RequestBody Video video) {
        Optional<Video> updateVideo = Optional.of(videoRepository.findById(video.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(entity -> {
                entity.setId(video.getId());
                entity.setName(video.getName());
                entity.setCode(video.getCode());
                entity.setPic(video.getPic());
                entity.setUrl(video.getUrl());
                entity.setDesc(video.getDesc());
                videoRepository.save(entity);
                logger.info("Changed Information for video: {}", entity);
                return entity;
            });
        return ResponseUtil.wrapOrNotFound(
            updateVideo,
            HeaderUtil.createAlert(applicationName, "videoManagement.updated", "" + video.getName())
        );
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        videoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "videoManagement.deleted", "" + id)).build();
    }

    @GetMapping("/query/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Video> query(@PathVariable("id") Long id) {
        return ResponseUtil.wrapOrNotFound(videoRepository.findById(id));
    }

    @GetMapping("/page")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<List<Video>> page(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<Video> page = videoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }
}
