import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getVideo, getRoles, updateVideo, createVideo, reset } from './video-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const VideoManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getVideo(id));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [id]);

  const handleClose = () => {
    navigate('/entity/video-management');
  };

  const saveVideo = values => {
    if (isNew) {
      dispatch(createVideo(values));
    } else {
      dispatch(updateVideo(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const video = useAppSelector(state => state.videoManagement.video);
  const loading = useAppSelector(state => state.videoManagement.loading);
  const updating = useAppSelector(state => state.videoManagement.updating);
  const authorities = useAppSelector(state => state.videoManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="videoManagement.home.createOrEditLabel">Create or edit a Video</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveVideo} defaultValues={video}>
              {video.id ? (
                <ValidatedField
                  type="text"
                  name="id"
                  required
                  readOnly
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                type="text"
                name="name"
                label={translate('videoManagement.name')}
                validate={{
                  maxLength: {
                    value: 60,
                    message: translate('entity.validation.maxlength', { max: 60 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="type"
                label={translate('videoManagement.type')}
                validate={{
                  maxLength: {
                    value: 60,
                    message: translate('entity.validation.maxlength', { min: 4, max: 16 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="code"
                label={translate('videoManagement.code')}
                validate={{
                  required: {
                    value: true,
                    message: translate('register.messages.validate.login.required'),
                  },
                  minLength: {
                    value: 1,
                    message: translate('entity.validation.minlength'),
                  },
                  maxLength: {
                    value: 60,
                    message: translate('entity.validation.maxlength', { max: 60 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="pic"
                label={translate('videoManagement.pic')}
                validate={{
                  maxLength: {
                    value: 255,
                    message: translate('entity.validation.maxlength', { max: 255 }),
                  },
                }}
              />
              <FormText>This field cannot be longer than 255 characters.</FormText>
              <ValidatedField
                type="text"
                name="url"
                label={translate('videoManagement.url')}
                validate={{
                  maxLength: {
                    value: 255,
                    message: translate('entity.validation.maxlength', { max: 255 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="desc"
                label={translate('videoManagement.desc')}
                validate={{
                  maxLength: {
                    value: 255,
                    message: translate('entity.validation.maxlength', { max: 255 }),
                  },
                }}
              />
              <Button tag={Link} to="/entity/video-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideoManagementUpdate;
