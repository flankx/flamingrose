import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATETIME_FORMAT } from 'app/config/constants';
import { getVideo } from './video-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
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
      <Row className="g-4">
        {' '}
        {/* 增加栅格间距 */}
        <Col md={4}>
          <div className="position-relative mb-4">
            {' '}
            {/* 增加底部间距 */}
            {video.pic && <img src={video.pic} alt={video.name} className="img-fluid" />}
          </div>

          <div className="text-center">
            <Link to="/entity/video-play" state={{ type: video.type, code: video.code, url: video.url }} className="btn btn-primary">
              <FontAwesomeIcon icon={faYoutube as IconProp} size="xl" className="me-2" style={{ color: '#ff0000' }} />
              播放视频
            </Link>
          </div>
        </Col>
        <Col md={8}>
          <div className="info-box p-4">
            {' '}
            {/* 增加内边距 */}
            <h2 className="mb-4">{video.name}</h2>
            <Row className="mb-4">
              <Col sm={6}>
                <p className="mb-2">
                  <FontAwesomeIcon icon="tag" className="me-2 text-secondary" />
                  类型: <span className="fw-bold">{video.type}</span>
                </p>
                <p className="mb-2">
                  <FontAwesomeIcon icon="hashtag" className="me-2 text-secondary" />
                  编码: <span className="fw-bold">{video.code}</span>
                </p>
                <p className="mb-2">
                  <FontAwesomeIcon icon="user" className="me-2 text-secondary" />
                  创建者: <span className="fw-bold">{video.createdBy}</span>
                </p>
                <p className="mb-2">
                  <FontAwesomeIcon icon="calendar" className="me-2 text-secondary" />
                  创建时间:{' '}
                  <span className="fw-bold">
                    {video.createdDate && <TextFormat value={video.createdDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />}
                  </span>
                </p>
              </Col>
              <Col sm={6}>
                <p className="mb-2">
                  <FontAwesomeIcon icon="user-edit" className="me-2 text-secondary" />
                  修改者: <span className="fw-bold">{video.lastModifiedBy}</span>
                </p>
                <p className="mb-2">
                  <FontAwesomeIcon icon="calendar-alt" className="me-2 text-secondary" />
                  修改时间:{' '}
                  <span className="fw-bold">
                    {video.lastModifiedDate && (
                      <TextFormat value={video.lastModifiedDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />
                    )}
                  </span>
                </p>
              </Col>
            </Row>
            <div className="video-desc bg-white p-3 rounded">
              <h5 className="mb-3">视频描述</h5>
              <p className="text-muted">{video.desc || '暂无描述'}</p>
            </div>
            <div className="mt-4">
              <Button tag={Link} to="/entity/video-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                <span className="ms-1">返回列表</span>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VideoManagementDetail;
