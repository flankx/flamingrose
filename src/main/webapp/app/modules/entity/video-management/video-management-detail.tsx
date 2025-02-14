import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATETIME_FORMAT } from 'app/config/constants';
import { getVideo } from './video-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import VideoAlert from '../video-play/video-alert';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './video-management-detail.scss';

export const VideoManagementDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getVideo(id));
  }, []);

  const video = useAppSelector(state => state.videoManagement.video);

  return (
    <div className="video-detail">
      <Row className="justify-content-center">
        <Col md="8">
          {/* 视频封面区域 */}
          <div className="position-relative mb-4">{video.pic && <img src={video.pic} alt={video.name} className="cover-image" />}</div>

          {/* 视频信息区域 */}
          <div className="info-box">
            <div className="video-title d-flex justify-content-between align-items-center">
              <h2 className="mb-0">{video.name}</h2>
              <Link
                to="/entity/video-play"
                state={{ type: video.type, code: video.code, url: video.url }}
                className="alert-link"
                id={'tooltip-' + video.id}
              >
                <FontAwesomeIcon icon={faYoutube as IconProp} size="xl" className="me-2" style={{ color: '#ff0000' }} />
              </Link>
            </div>

            <hr className="my-3" />

            <div className="video-meta">
              <Row>
                <Col sm={6}>
                  <p className="mb-2">
                    <FontAwesomeIcon icon="tag" className="me-2" />
                    类型: {video.type}
                  </p>
                  <p className="mb-2">
                    <FontAwesomeIcon icon="hashtag" className="me-2" />
                    编码: {video.code}
                  </p>
                  <p className="mb-2">
                    <FontAwesomeIcon icon="user" className="me-2" />
                    创建者: {video.createdBy}
                  </p>
                  <p className="mb-2">
                    <FontAwesomeIcon icon="calendar" className="me-2" />
                    创建时间:{' '}
                    {video.createdDate && <TextFormat value={video.createdDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />}
                  </p>
                </Col>
                <Col sm={6}>
                  <p className="mb-2">
                    <FontAwesomeIcon icon="user-edit" className="me-2" />
                    修改者: {video.lastModifiedBy}
                  </p>
                  <p className="mb-2">
                    <FontAwesomeIcon icon="calendar-alt" className="me-2" />
                    修改时间:{' '}
                    {video.lastModifiedDate && (
                      <TextFormat value={video.lastModifiedDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />
                    )}
                  </p>
                </Col>
              </Row>
            </div>

            <hr className="my-3" />

            <div className="video-desc">
              <h5 className="mb-3">视频描述</h5>
              <p>{video.desc}</p>
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="mt-4">
            <Button tag={Link} to="/entity/video-management" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              <span className="d-none d-md-inline ms-1">返回</span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VideoManagementDetail;
