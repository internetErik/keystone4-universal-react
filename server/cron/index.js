import keystone from 'keystone';

const millisecondsUntilDate = d => d - new Date();

export const startCronJobs = () => {
  console.log("*** Starting Cron Jobs ***");
  const chicagoTimezoneOffset = 300;
  const serverTimezoneOffset = (new Date()).getTimezoneOffset();
  const timezoneAdjustment = chicagoTimezoneOffset - serverTimezoneOffset;
  let firstRun  = true;

  // const someJob = () => {
  //   const d = new Date();
  //   d.setHours(24, timezoneAdjustment, 0, 0);
  //   const interval = millisecondsUntilDate(d);

  //   keystone.list('Something')
  //   .model
  //   .findOne()
  //   .exec((err, result) => {
  //     if(err) console.error(err);
  //     const runImmediately = !(!!result);

  //     setTimeout(() => {
  //       getCourseData()
  //         .then(someJob);
  //     }, interval);

  //     if(runImmediately && firstRun) {
  //       firstRun = false;
  //       get
  //       Data();
  //     }
  //   });
  // }

  // someJob();
}
