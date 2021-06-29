import { URLS } from '../../configs/constants';
import { Login } from '../../services/Auth';
import 'bootstrap/dist/js/bootstrap.bundle';
import Sidebar from '../../components/Sidebar';
import QuickUser from '../../components/QuickUser';

(function () {
  if (!Login.getAuth()) {
    window.location.href = `${URLS.app}/auth/login`;
  }
  // eslint-disable-next-line no-unused-vars
  const sidebar = new Sidebar();
  // eslint-disable-next-line no-unused-vars
  const quickUser = new QuickUser();
})();
