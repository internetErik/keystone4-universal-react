// models for admin
import { User }              from './User';
import { SiteConfiguration } from './SiteConfiguration';

// site data
import { MediaItem }         from './MediaItem';
import { ContactEnquiry }    from './ContactEnquiry';
import { Faq }               from './Faq';

// page models
import { HomePage }    from './pages/HomePage';
import { FaqPage }     from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

export const setupModels = keystone => {
  User(keystone);
  SiteConfiguration(keystone);
  MediaItem(keystone);
  ContactEnquiry(keystone);
  Faq(keystone);
  HomePage(keystone);
  FaqPage(keystone);
  ContactPage(keystone);
}
