import { parseJsonByString } from '../../../common/utils';
import Article from './component/Article';
import Banner from './component/Banner/';
import Footer from './component/Footer';
import request from '../../../common/request';
import { useEffect, useState } from 'react';

const map = { Banner, Footer, Article };

const render = (item, index) => {
  const Component = map[item.name];
  return Component ? <Component key={index} schema={item} index={index}></Component> : null;
}


const Home = () => {
  const [pageSchema, setPageSchema] = useState({});
  const children = pageSchema.children || [];
  useEffect(() => {
    request.get('http://127.0.0.1:7001/api/schema/getLatestOne').then((res) => {
      const data = res?.data;
      if (data) {
        const schema = data?.schema;
        console.log();
        setPageSchema(parseJsonByString(schema, {}));
      }

    })
  }, []);

  return (
    <div>
      {
        children.map((item, index) => {
          return (render(item, index));
        })
      }
    </div>

  );
}

export default Home;