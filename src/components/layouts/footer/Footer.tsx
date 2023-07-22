import Icon from '@mdi/react';
import { mdiFacebook } from '@mdi/js';
import { useTranslation } from 'next-i18next';
const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <footer className='h-[360px] bg-[#666] text-white'>
        <div className='pt-10 flex'>
          <div className='w-1/4 my-auto'>
            <div className='flex justify-center'>logo</div>
            <div className='w-fit mx-auto'>
              <p className='mt-8'>TEL : 075-841-8866</p>
              <p className=''>E-mail : xxxxx@xxx.co.jp</p>
              <div className='mt-7'>
                <Icon className='absolute z-50' path={mdiFacebook} size={1} color={'blue'} />
                <div className='w-4 h-4 relative top-1 left-1 rounded-[50%] overflow-hidden bg-white'></div>
              </div>
            </div>
          </div>
          <div className='h-[280px] w-px my-auto bg-white'></div>
          <div className='w-3/4 mt-6 mb-auto'>
            <div className='w-[80%] mx-auto flex justify-between'>
              <div className='w-[30%]'>
                <div className="parent">
                  <a href=''>{t('Footer.Home')}</a>
                </div>
                <div className='pt-4'>
                  <a href=''>{t('Footer.ProductList')}</a>
                </div>
                <div className='pl-5 pt-4'>
                  <a href=''>{t('Footer.NewGuns')}</a>
                </div>
                <div className='pl-5 pt-4'>
                  <a href=''>{t('Footer.OldGuns')}</a>
                </div>
                <div className='pl-5 pt-4'>
                  <a href=''>{t('Footer.OnlineStore')}</a>
                </div>
              </div>
              <div className='w-[30%]'>
                <div className="parent">
                  <a href=''>{t('Footer.News')}</a>
                </div>
                <div className='pt-4'>
                  <a href=''>{t('Footer.AboutUs')}</a>
                </div>
                <div className='pl-5 pt-4'>
                  <a href=''>{t('Footer.CorporateInformation')}</a>
                </div>
                <div className='pl-5 pt-4'>
                  <a href=''>{t('Footer.History')}</a>
                </div>
                <div className='pl-5 pt-4'>
                  <a href=''>{t('Footer.OurBusiness')}</a>
                </div>
              </div>
              <div className='w-[30%]'>
                <div className="parent">
                  <a href=''>{t('Footer.Links')}</a>
                </div>
                <div className="parent pt-4">
                  <a href=''>{t('Footer.Contact')}</a>
                </div>
                <div className={`pt-4`}>
                  <a href=''>{t('Footer.PrivacyPolicy')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className='text-center pb-4'>{t('Footer.CopyRight')}</p>
      </footer>
    </>
  );
};

export default Footer;
