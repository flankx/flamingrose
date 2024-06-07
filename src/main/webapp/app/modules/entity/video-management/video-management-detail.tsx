import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
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
        <Translate contentKey="userManagement.detail.title">Title</Translate> [<strong>{video.code}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="userManagement.login">id</Translate>
          </dt>
          <dd>
            <span>{video.id}</span>
          </dd>
          <dt>
            <Translate contentKey="userManagement.firstName">name</Translate>
          </dt>
          <dd>{video.name}</dd>
          <dt>
            <Translate contentKey="userManagement.lastName">code</Translate>
          </dt>
          <dd>{video.code}</dd>
          <dt>
            <Translate contentKey="userManagement.email">pic</Translate>
          </dt>
          <dd>{video.pic}</dd>
          <dt>
            <Translate contentKey="userManagement.langKey">url</Translate>
          </dt>
          <dd>{video.url}</dd>
          <dt>
            <Translate contentKey="userManagement.profiles">desc</Translate>
          </dt>
          <dd>{video.desc}</dd>
          <dt>
            <Translate contentKey="userManagement.createdBy">Created By</Translate>
          </dt>
          <dd>{video.createdBy}</dd>
          <dt>
            <Translate contentKey="userManagement.createdDate">Created Date</Translate>
          </dt>
          <dd>{video.createdDate ? <TextFormat value={video.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>
            <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
          </dt>
          <dd>{video.lastModifiedBy}</dd>
          <dt>
            <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
          </dt>
          <dd>
            {video.lastModifiedDate ? (
              <TextFormat value={video.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/entiity/video-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

export default VideoManagementDetail;
