import {leancloud} from '../common/config';

const connect = (id) => {
  AV.init(leancloud.appId, leancloud.appKey);
  new Promise((resolve, reject) => {
    let query = new AV.Query('Visitor');
    query.first().then(data => {
      resolve(data)
    }, error => {
      reject(error);
    });
  }).then(data => {
    if (!data) {
      let Visitor = AV.Object.extend('Visitor');
      let user = new Visitor();
      user.set('time', '1');
      user.set('name', id);
      user.save();
    } else {
      let user = AV.Object.createWithoutData('Visitor', data.id);
      user.set('time', `${+data._serverData.time + 1}`);
      user.save();
    }
  });
}

export default connect;
