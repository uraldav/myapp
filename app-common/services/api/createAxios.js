import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';

/**
 * Настройка axios с авторизационным токеном для схемы RFC 6750
 */
export default cookie =>
  axios.create({
    transformRequest: [
      (data, headers) => {
        headers.Authorization = cookie.get(
          'Authorization',
        ); /* eslint no-param-reassign: 0 */

        return axiosDefaults.transformRequest[0](data, headers);
      },
    ],
  });
