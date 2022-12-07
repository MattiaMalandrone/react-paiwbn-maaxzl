import core from '../features/coreSlice';
import user from '../features/userSlice';
import { accountApi, userApi } from '../../services';

/**
 * An object that contains all the reducers for the application
 */
export default {
  core,
  user,
  [accountApi.reducerPath]: accountApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};
