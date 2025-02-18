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

  const [previewUrl, setPreviewUrl] = useState('');
  const isInvalid = false;
  const video = useAppSelector(state => state.videoManagement.video);
  const [picValue, setPicValue] = useState(video?.pic || ''); // 添加状态

  const loading = useAppSelector(state => state.videoManagement.loading);
  const updating = useAppSelector(state => state.videoManagement.updating);
  const authorities = useAppSelector(state => state.videoManagement.authorities);

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
    const updatedValues = {
      ...values,
      pic: picValue, // 确保使用最新的pic值
    };

    if (isNew) {
      dispatch(createVideo(updatedValues));
    } else {
      dispatch(updateVideo(updatedValues));
    }
    handleClose();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件大小（2MB限制）
      if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过2MB');
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPicValue(base64String); // 更新状态
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
              {(previewUrl || video.pic) && (
                <div className="mb-3">
                  <img src={previewUrl || video.pic} alt="预览图" style={{ maxWidth: '200px', marginBottom: '10px' }} />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">
                  <Translate contentKey="videoManagement.pic">上传图片</Translate>
                </label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
                <FormText>支持 jpg、png 等常见图片格式,大小不超过 2MB</FormText>
              </div>
              <ValidatedField
                type="hidden"
                name="pic"
                defaultValue={picValue} // 使用 defaultValue 而不是 value
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
