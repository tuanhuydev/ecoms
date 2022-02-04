import './vendors/images';
import $ from 'jquery';
import Loading from './components/Loading';

(function () {
  const loading = Loading.getInstance();
  $(window).on('load', () => {
    loading.getEl().fadeOut(200);
  });
})();
