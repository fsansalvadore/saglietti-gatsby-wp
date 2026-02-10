import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const ChiSiamoPage = ({ data }) => {
  console.log("data", data)
  return (
    <div className="w-full mx-auto max-w-[970px] p-4 sm:p-8 sm:py-20 flex flex-col gap-8 lg:gap-20">
      <div className="[&_p]:pb-4 text-xl font-medium pt-20">
        <p className="">
          Fondata da Alessandro Saglietti nel 2015, lo studio è specializzato in
          identità visiva, advertising, editoria ed exhibit design. La nostra
          missione: creare valore.
        </p>
        <p className="">
          Non soddisfiamo solo le esigenze immediate del cliente, ma puntano
          alla loro comprensione in modo più profondo e significativo, con
          l'obiettivo di generare soluzioni complete e che portano a risultati
          concreti.
        </p>
        <p className="">
          Crediamo che un buon design richieda tempo e dedizione, per questo
          esploriamo con attenzione l'identità e il carattere di ogni cliente
          con cui collaboriamo. Lavorando a stretto contatto con loro, emerge in
          modo naturale un design funzionale e contemporaneo.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 text-md font-medium">
        <div className="">
          <p>
            Staff Founder, director Alessandro Saglietti Designer Virginia
            Malino Francesca De Bortoli Alessio Maddalena Hanno collaborato con
            noi d Marzia Anania, Gaia Bonessa, Giorgia Bourlot, Sofia Calvo,
            Marta Doria, Rachele Fasoli, Gloria Geri, Martina Leone, Alessia
            Leonetti, Erika Lo Bianco, Ales 2 Mastrorilli, Laura Notarpietro,
            Gaia Perenno, Elisa Peroglio, Michelt Piovano, Giacomo Piovesan,
            Fabrizio Primo, Luca Sommadossi, Andrea Vinci, Stefano Vitti
          </p>
        </div>
        <div className="">
          <p>
            Staff Founder, director Alessandro Saglietti Designer Virginia
            Malino Francesca De Bortoli Alessio Maddalena Hanno collaborato con
            noi d Marzia Anania, Gaia Bonessa, Giorgia Bourlot, Sofia Calvo,
            Marta Doria, Rachele Fasoli, Gloria Geri, Martina Leone, Alessia
            Leonetti, Erika Lo Bianco, Ales 2 Mastrorilli, Laura Notarpietro,
            Gaia Perenno, Elisa Peroglio, Michelt Piovano, Giacomo Piovesan,
            Fabrizio Primo, Luca Sommadossi, Andrea Vinci, Stefano Vitti
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <StaticImage
          src="../../../images/alessandro-saglietti.webp"
          alt="Alessandro Saglietti"
          className="w-full aspect-[4/3] object-cover"
        />
        <StaticImage
          src="../../../images/alessandro-saglietti.webp"
          alt="Alessandro Saglietti"
          className="w-full aspect-[4/3] object-cover"
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 text-md font-medium">
        <div className="">
          <p>
            Staff Founder, director Alessandro Saglietti Designer Virginia
            Malino Francesca De Bortoli Alessio Maddalena Hanno collaborato con
            noi d Marzia Anania, Gaia Bonessa, Giorgia Bourlot, Sofia Calvo,
            Marta Doria, Rachele Fasoli, Gloria Geri, Martina Leone, Alessia
            Leonetti, Erika Lo Bianco, Ales 2 Mastrorilli, Laura Notarpietro,
            Gaia Perenno, Elisa Peroglio, Michelt Piovano, Giacomo Piovesan,
            Fabrizio Primo, Luca Sommadossi, Andrea Vinci, Stefano Vitti
          </p>
        </div>
        <div className="">
          <p>
            Staff Founder, director Alessandro Saglietti Designer Virginia
            Malino Francesca De Bortoli Alessio Maddalena Hanno collaborato con
            noi d Marzia Anania, Gaia Bonessa, Giorgia Bourlot, Sofia Calvo,
            Marta Doria, Rachele Fasoli, Gloria Geri, Martina Leone, Alessia
            Leonetti, Erika Lo Bianco, Ales 2 Mastrorilli, Laura Notarpietro,
            Gaia Perenno, Elisa Peroglio, Michelt Piovano, Giacomo Piovesan,
            Fabrizio Primo, Luca Sommadossi, Andrea Vinci, Stefano Vitti
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChiSiamoPage
