import styles from "./Header.module.scss"

type HeaderProps = {
  bgColor: string
}

const Header = ({
  bgColor
}: HeaderProps) => {
  return(
    <>
      <header className="h-[80px] flex justify-between" style={{backgroundColor: bgColor}}>
        <div className="my-auto">logo</div>
        <div className={`my-auto flex ${styles.h_div}`}>
          <div>
            <a href="">商品一覧</a>
          </div>
          <div>
            <a href="">店舗案内</a>
          </div>
          <div>
            <a href="">お問い合わせ</a>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
