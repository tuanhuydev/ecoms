import Loading from '@components/Loading';

window.addEventListener('load', function() {
  const loading = Loading.getInstance();
  loading.getEl().fadeOut(200);
});
