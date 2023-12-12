import React from 'react';
import Header from './components/header/Header';
import MenuIcons from './components/menu-icons/MenuIcons';
import Area from './components/area/Area';
import Modal from './components/modal/Modal';
import Storage from './components/storage/Storage';
import Shop from './components/shop/Shop';
import Notification from './components/shared/notification/Notification';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Area />
      <MenuIcons />

      <Modal title="Storage" type="storage">
        <Storage />
      </Modal>

      <Modal title="Shop" type="shop">
        <Shop />
      </Modal>

      <Notification />
    </div>
  );
};

export default App;
