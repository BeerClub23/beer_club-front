import Image from "next/image";
import styles from "../aboutUsCard/AboutUsCard.module.scss";
import chop from "../../../public/images/aboutUs/black-chop.png";
import lupulo from "../../../public/images/aboutUs/lupulo.png";

export const AboutUsCard = () => {
  return (
    <article className={styles.containerArticle}>
      <Image
        src={chop}
        width={100}
        height={142}
        alt="logo"
        className={styles.containerArticle_logo1}
      />
      <Image
        src={chop}
        width={100}
        height={142}
        alt="logo"
        className={styles.containerArticle_logo2}
      />
      <div className={styles.containerArticle_textContainer}>
        <p className={styles.containerArticle_text} data-aos="fade-up">
          ¡Imaginate un mundo en el que cada sorbo es como una nueva aventura!
          Donde cada cerveza es como abrir la puerta a un mundo lleno de
          sabores, olores y tradiciones por descubrir. Cuando te sumás a Beer
          Club, te lanzás de cabeza a un lugar lleno de descubrimientos y buenos
          momentos.{" "}
        </p>
        <p className={styles.containerArticle_text} data-aos="fade-up">
          Todos los meses, recibirás en tu puerta una cuidadosa selección de
          cervezas artesanales de todo el mundo. Además, creamos experiencias
          únicas con eventos exclusivos, catas virtuales protagonizadas por
          cerveceros de renombre y te conectamos con otros amantes apasionados
          de la cerveza...{" "}
        </p>
        <p className={styles.containerArticle_text} data-aos="fade-up">
          Si estás listo para unirte a una movida que celebra la diversidad de
          la cerveza y para experimentar un mundo de sabores y camaradería que
          solo los verdaderos fanáticos de la birra pueden disfrutar, entonces
          Beer Club es tu destino cervecero definitivo.
        </p>
        <p className={styles.containerArticle_spanText} data-aos="fade-up">
          <span>... y salud a la pasión por la cerveza!</span>
        </p>
      </div>
      <div className={styles.containerArticle_imageAside}>
        <Image
          src={lupulo}
          width={220}
          height={285}
          className={styles.containerArticle_pic}
          alt="Imagen"
        />
        <Image
          src={lupulo}
          width={110}
          height={192.5}
          className={styles.containerArticle_picMobile}
          alt="Imagen"
        />
      </div>
    </article>
  );
};
