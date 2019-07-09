import { slainteDram, commentDram, uploadDram } from '../api/drams';
import { replaceComment, uploadDramImageFailed, uploadDramImageSuccess } from '../actions/dram';
import { fileFromURI } from '../../core/files';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: any) => {
      slainteDram((action as DramSlainteAction).DramId);
    },
    type: ['DRAM_SLAINTE'],
  },
  {
    listener: (dispatch, action: any) => {
      commentDram(action.DramId, action.comment)
        .then((comment) => {
          dispatch(replaceComment(action.DramId, action.id, comment));
        });
    },
    type: ['DRAM_COMMENT'],
  },
  {
    listener: (dispatch, action: any) => {
      if (action.uri) {
        uploadDram(action.id, fileFromURI(action.uri))
          .then(({ image }) => dispatch(uploadDramImageSuccess(action.id, image)))
          .catch(() => dispatch(uploadDramImageFailed(action.id)));
      }
    },
    type: ['UPLOAD_DRAM_PHOTO'],
  },
];

export default listeners;
