import { ImageGallery } from "@/components/image-gallery";


const sampleImages = [
    "https://cbu01.alicdn.com/O1CN01JOyWVG25R8BumbClD_!!2200812377522-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01YExKvx2HrwlsQw6Us_!!2208022379205-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01KE7eLd1X2DoZmNx1j_!!2220248932865-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01Usar5P1KXjy85B4Tt_!!2201223191174-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01Ato0q31qcNjhCAham_!!2219438855516-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01lXEorL1mWeGNyITKI_!!2207270434962-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01Nf0ZH41gBE2k198cH_!!2217157444103-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN017j886f2C32jUFpiNo_!!2219458398417-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01rHpeCk1DgiPtZRhJB_!!2217495140246-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01vctg851QI46VTpy6u_!!2217137381952-0-cib.jpg",
    "https://cbu01.alicdn.com/O1CN01SCA9td1HBLo8IIeHJ_!!2219436090719-0-cib.jpg"
]

export default function GalleryDemoPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Image Gallery Demo</h1>
                    <p className="text-muted-foreground">
                        A clean and responsive image gallery component with modal view
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Basic Gallery */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Basic Gallery</h2>
                        <ImageGallery images={sampleImages} />
                    </section>
                </div>
            </div>
        </div>
    );
}
