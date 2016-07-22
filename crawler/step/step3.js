for (let i = 0; i < 51; i++) {
  // process.stdout.write(i/50+'\033[0G')
  // process.stdout.write(i/50+'\x1b[0G')
  if (i < 50)
    setTimeout(function () {
      process.stdout.write(i / 50 + '\r')
    }, 100 * i)
  else {
    setTimeout(function () {
      process.stdout.write('\n1')
    }, 100 * 51)
  }
}
