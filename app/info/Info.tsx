import Image from "next/image"
const Info = () => {
  return (
    <div className=" mt-16 py-3 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <h2 className="mb-2 text-lg text-green-700">
          Geri dönüşüm neden önemli?
        </h2>
        <div className="mt-3">
          <p className="text-gray-800 text-sm">
            Geri dönüşüm, atıkların doğru bir şekilde toplanması, ayrılması ve
            yeniden kullanılması sürecidir. Bu süreç, doğal kaynakların
            korunmasına, enerji tasarrufuna ve çevrenin korunmasına büyük katkı
            sağlar.
            <br />
            <br />
            Geri dönüşüm, kullanılmış malzemelerin tekrar işlenerek yeni
            ürünlere dönüştürülmesini sağlar. Plastik, metal, cam, kağıt gibi
            birçok malzeme geri dönüştürülerek çöp depolama alanlarının
            azaltılmasına ve çevreye zararlı atıkların oluşumunun engellenmesine
            yardımcı olur. <br /> <br />
            Her birimizin, evlerimizde, işyerlerimizde ve toplumumuzda geri
            dönüşümü teşvik etmek için yapabileceği birçok şey vardır. Atıkları
            ayrıştırmak, geri dönüşüm kutularını kullanmak, geri dönüşüm
            tesislerine atıkları götürmek ve geri dönüşüm bilincini artırmak
            gibi adımlarla çevre dostu bir yaşam tarzı benimseyebiliriz. <br />
            <br />
            Geri dönüşüm, sadece bugün için değil, gelecek nesiller için de
            önemlidir. Doğal kaynakların korunması ve çevrenin temiz tutulması
            için hepimizin sorumluluk alması gerekmektedir.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Info
