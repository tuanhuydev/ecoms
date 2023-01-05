import 'assets/images/bootstrap-icons.svg';
import Loading from 'scripts/components/Loading';

window.addEventListener('load', function () {
  const loading = Loading.getInstance();
  loading.getEl().fadeOut(200);
});
