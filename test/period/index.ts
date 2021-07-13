import b2b from '../b2b'

// getPeriods
const getPeriods = async () => {
  const res = await b2b.period.getPeriods()
  console.log('getPeriods Res -> ', res)
  console.log('-------------')
}
getPeriods()
