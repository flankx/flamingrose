import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATETIME_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getVideo } from './video-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const VideoManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getVideo(id));
  }, []);

  const video = useAppSelector(state => state.videoManagement.video);

  return (
    <div>
      <h2>
        <Translate contentKey="videoManagement.detail.title">Title</Translate> [<strong>{video.code}</strong>]
      </h2>
      <Row size="md">
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
            <Translate contentKey="videoManagement.code">code</Translate>
          </dt>
          <dd>{video.code}</dd>
          <dt>
            <Translate contentKey="videoManagement.pic">pic</Translate>
          </dt>
          <dd>{video.pic}</dd>
          <dt>
            <Translate contentKey="videoManagement.url">url</Translate>
          </dt>
          <dd>{video.url}</dd>
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
      </Row>
      <Button tag={Link} to="/entity/video-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

export default VideoManagementDetail;
