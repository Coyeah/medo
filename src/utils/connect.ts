// import {leancloud} from '../common/config';

const leancloud = {
  appId: 'your app id',
  appKey: 'your app key'
};ß

const connect = (id) => {
  AV.init(leancloud.appId, leancloud.appKey);
  new Promise((resolve, reject) => {
    let query = new AV.Query('Visitor');
    query.contains('name',id);
    query.first().then(data => {
      resolve(data)
    }, error => {
      reject(error);
    });
  }).then(data => {
    if (!data) {
      let Visitor = AV.Object.extend('Visitor');
      let user = new Visitor();
      user.set('times', '1');
      user.set('name', id);
      user.save();
    } else {
      let user = AV.Object.createWithoutData('Visitor', data.id);
      user.set('times', `${+data._serverData.times + 1}`);
      user.save();
    }
  });
}

export default connect;
