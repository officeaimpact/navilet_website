interface SkolkovoBadgeProps {
  /** Классы для размера изображения (высота логотипа) */
  imgClassName?: string;
  /** Дополнительные классы контейнера */
  className?: string;
}

/**
 * Официальный логотип «Участник проекта Сколково».
 *
 * По брендбуку Фонда запрещено менять цвет, пропорции и добавлять эффекты —
 * поэтому логотип используется как есть (официальный зелёный) и только
 * на светлом фоне. Вокруг соблюдается охранное поле (padding контейнера).
 */
export default function SkolkovoBadge({
  imgClassName = "h-8 w-auto",
  className = "",
}: SkolkovoBadgeProps) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      title="Участник проекта «Сколково»"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/partners/skolkovo-uchastnik.png"
        alt="Участник проекта «Сколково»"
        loading="lazy"
        className={imgClassName}
        draggable={false}
      />
    </span>
  );
}
