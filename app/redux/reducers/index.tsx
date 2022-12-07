import core from '@core/redux/features/coreSlice';
import user from '@core/redux/features/userSlice';
import { accountApi, userApi } from '@core/services';

/**
 * An object that contains all the reducers for the application
 */
export default {
  core,
  user,
  [accountApi.reducerPath]: accountApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};
