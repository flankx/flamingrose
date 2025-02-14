import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Badge, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATETIME_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getVideo } from './video-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import VideoAlert from '../video-play/video-alert';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const VideoManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getVideo(id));
  }, []);

  const video = useAppSelector(state => state.videoManagement.video);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="videoManagement.detail.title">视频详情</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="global.field.id">id</Translate>
            </dt>
            <dd>
              <span>{video.id}</span>
            </dd>
            <dt>
              <Translate contentKey="videoManagement.name">name</Translate>
            </dt>
            <dd>{video.name}</dd>
            <dt>
              <Translate contentKey="videoManagement.type">type</Translate>
            </dt>
            <dd>{video.type}</dd>
            <dt>
              <Translate contentKey="videoManagement.code">code</Translate>
            </dt>
            <dd>{video.code}</dd>

            <dt>
              <Translate contentKey="videoManagement.pic">缩略图</Translate>
            </dt>
            <dd>
              {video.pic && (
                <img
                  src={video.pic}
                  alt={video.name}
                  className="video-thumbnail"
                  style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain' }}
                />
              )}
            </dd>
            <dt>
              <Translate contentKey="videoManagement.url">视频链接</Translate>
            </dt>
            <dd>
              {video.url}
              <VideoAlert id={video.id} url={video.url}>
                <Link
                  to="/entity/video-play"
                  state={{ type: video.type, code: video.code, url: video.url }}
                  className="alert-link ms-2"
                  id={'tooltip-' + video.id}
                >
                  <FontAwesomeIcon icon={faYoutube as IconProp} size="xl" />
                </Link>
              </VideoAlert>
            </dd>
            <dt>
              <Translate contentKey="videoManagement.desc">desc</Translate>
            </dt>
            <dd>{video.desc}</dd>
            <dt>
              <Translate contentKey="videoManagement.createdBy">Created By</Translate>
            </dt>
            <dd>{video.createdBy}</dd>
            <dt>
              <Translate contentKey="videoManagement.createdDate">Created Date</Translate>
            </dt>
            <dd>
              {video.createdDate ? <TextFormat value={video.createdDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid /> : null}
            </dd>
            <dt>
              <Translate contentKey="videoManagement.lastModifiedBy">Last Modified By</Translate>
            </dt>
            <dd>{video.lastModifiedBy}</dd>
            <dt>
              <Translate contentKey="videoManagement.lastModifiedDate">Last Modified Date</Translate>
            </dt>
            <dd>
              {video.lastModifiedDate ? (
                <TextFormat value={video.lastModifiedDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />
              ) : null}
            </dd>
          </dl>

          <Button tag={Link} to="/entity/video-management" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">返回</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default VideoManagementDetail;
