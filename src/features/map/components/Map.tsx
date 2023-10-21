const container = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 35.02001496157767,
  lng: 135.74250988876247,
};

const Map = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d772.8012093603542!2d135.7432636821266!3d35.0202360198916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600107c4cd0feb0b%3A0xac99e513bf6860b4!2z5bCP5p6X6YqD56Cy54Gr6Jas5bqX!5e0!3m2!1sja!2sjp!4v1697876440919!5m2!1sja!2sjp"
        width="600"
        height="450"
        style={{"border": 0}}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
