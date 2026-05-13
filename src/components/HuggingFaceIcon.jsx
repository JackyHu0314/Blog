const officialLogoUrl =
  'https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg'

export default function HuggingFaceIcon({
  width = 60,
  height = 60,
  style,
  ...props
}) {
  return (
    <img
      src={officialLogoUrl}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      decoding="async"
      style={{ display: 'block', objectFit: 'contain', ...style }}
      {...props}
    />
  )
}
