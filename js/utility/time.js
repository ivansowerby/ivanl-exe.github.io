function sleep(t) {
  start = Date.now();
  while(Date.now() < start + t);
}