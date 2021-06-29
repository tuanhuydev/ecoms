import $ from 'jquery';
import Loading from './components/Loading';
import './vendors/images';

(function () {
  const loading = Loading.getInstance();
  $(window).on('load', () => {
    loading.getEl().fadeOut(200);
  });
})();
