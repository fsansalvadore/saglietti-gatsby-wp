import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'

const CircleLink = styled.a`
    width: 36px;
    height: 36px;
    border: 1px solid #000;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
` 

const SocialIcon = ({isFacebook, isInstagram, isLinkedin, size}) => {
    const [current, setCurrent] = useState(null)

    const social = {
        facebook: {
            url: "https://www.facebook.com/sagliettistudio/",
            icon: "M597.332 341.333V239.733C597.332 193.866 607.466 170.666 678.665 170.666H767.999V0H618.932C436.266 0 375.999 83.733 375.999 227.466V341.333H256V511.998H375.999V1024H597.332V511.998H747.732L767.999 341.333H597.332Z"
        },
        instagram: {
            url: "https://www.instagram.com/studio.saglietti/",
            icon: "M86.0947 937.905C111.923 963.734 142.847 983.764 176.758 996.942C216.467 1012.4 258.46 1021.19 300.98 1022.59C355.8 1025.05 373.019 1025.76 512 1025.76C650.806 1025.76 668.728 1025.76 723.02 1022.59C765.54 1021.72 807.533 1013.63 847.242 998.699C881.153 985.521 912.077 965.315 937.905 939.662C963.734 913.834 983.764 883.086 996.942 848.999C1011.88 809.115 1019.96 767.297 1020.84 724.777C1023.3 670.133 1024 652.739 1024 513.757C1024 374.776 1024 357.205 1020.84 302.737C1020.13 259.69 1012.05 216.994 996.942 176.582C983.764 142.671 963.734 111.747 937.905 85.919C912.077 60.0906 881.153 40.0604 847.242 26.8826C807.533 11.9478 765.365 3.86548 723.02 2.98696C668.025 0.702814 650.806 0 511.824 0C373.019 0 355.097 0 300.804 2.98696C258.284 3.86548 216.291 11.9478 176.582 26.8826C142.671 40.0604 111.923 60.2663 86.0947 85.919C60.2663 111.747 40.2361 142.496 27.0583 176.582C12.1235 216.291 4.04118 258.46 3.16266 300.98C0.702814 355.624 0 373.019 0 511.824C0 650.63 0 668.376 3.16266 722.844C4.04118 765.364 11.9478 807.358 27.0583 847.242C40.2361 881.153 60.2663 912.077 86.0947 937.905ZM91.7172 304.143C92.0686 271.462 98.0426 238.957 109.463 208.209C126.858 163.404 162.35 128.088 207.154 110.869C237.551 99.6239 269.705 93.65 302.034 93.1229C356.151 90.663 371.262 89.9602 509.892 89.9602C648.522 89.9602 662.754 89.9602 717.749 93.1229C750.254 93.4743 782.232 99.4482 812.629 110.869C834.767 119.478 854.798 132.48 871.665 149.172C888.357 165.864 901.535 186.07 909.968 208.209C921.214 238.605 927.187 270.759 927.715 303.089C930.174 357.205 930.701 372.316 930.701 510.946C930.701 649.4 930.702 664.335 928.242 718.803H927.715C927.363 751.66 921.389 783.989 909.968 814.737C901.359 836.876 888.357 856.906 871.665 873.774C854.973 890.465 834.767 903.643 812.629 912.077C782.232 923.322 750.078 929.296 717.749 929.823C663.808 932.283 648.522 932.986 509.892 932.986C371.262 932.986 357.03 932.986 302.034 929.823C269.529 929.472 237.551 923.498 207.154 912.077C185.016 903.643 164.81 890.641 147.942 873.774C131.075 857.082 117.897 836.876 109.463 814.737C98.2183 784.34 92.2443 752.187 91.7172 719.857C89.2574 665.916 88.7303 650.63 88.7303 512C88.7303 373.37 88.7303 359.138 91.7172 304.143ZM785.043 300.277C818.954 300.277 846.364 272.868 846.364 238.957C846.364 205.046 818.954 177.636 785.043 177.636C751.132 177.636 723.723 205.046 723.723 238.957C723.723 272.868 751.132 300.277 785.043 300.277ZM511.649 774.501C581.403 774.501 648.346 746.74 697.543 697.543C746.916 648.17 774.501 581.403 774.501 511.649C774.501 441.894 746.74 374.951 697.543 325.754C648.17 276.382 581.403 248.796 511.649 248.796C441.894 248.796 374.951 276.557 325.754 325.754C276.382 375.127 248.796 441.894 248.796 511.649C248.796 581.403 276.557 648.346 325.754 697.543C374.951 746.74 441.894 774.501 511.649 774.501ZM390.765 390.765C422.743 358.787 466.317 340.689 511.473 340.689C556.629 340.689 600.203 358.611 632.181 390.765C664.159 422.743 682.257 466.317 682.257 511.473C682.257 556.804 664.335 600.203 632.181 632.181C600.203 664.159 556.629 682.257 511.473 682.257C466.317 682.257 422.743 664.335 390.765 632.181C358.787 600.203 340.689 556.629 340.689 511.473C340.865 466.141 358.787 422.743 390.765 390.765Z"
        },
        linkedin: {
            url: "https://www.linkedin.com/company/alessandro-saglietti-communication-design/",
            icon: "M157.995 858.344H311.979V395.667H157.995V858.344V858.344ZM322.005 252.989C321.323 207.677 288.683 172.989 235.989 172.989C183.296 172.989 148.651 207.635 148.651 252.989C148.651 296.979 181.973 332.989 233.984 332.989H234.667C288.683 332.989 322.005 296.979 322.005 252.989V252.989ZM712.021 858.344H866.005V593C866.005 451.005 790.016 385 688.683 385C606.037 385 569.344 430.995 549.333 462.995H550.656V395.667H396.672C396.672 395.667 398.677 439.016 396.672 858.344H550.656V599.699C550.656 586.344 551.339 572.349 555.307 562.365C566.656 535.016 591.957 506.344 634.624 506.344C689.963 506.344 711.979 548.328 711.979 611.005V858.344H712.021ZM1024 193V833C1024 938.984 937.984 1025 832 1025H192C86.016 1025 0 938.984 0 833V193C0 87.016 86.016 1 192 1H832C937.984 1 1024 87.016 1024 193Z"
        },
    }

    const styles = {
        svg: {
          display: 'inline-block',
          verticalAlign: 'middle',
        },
        path: {
          fill: "#000",
        },
      };

    useEffect(() => {
        if(isFacebook) {
            setCurrent({url: social.facebook.url, icon: social.facebook.icon})
        } else if (isInstagram) {
            setCurrent({url: social.instagram.url, icon: social.instagram.icon})
        } else if (isLinkedin) {
            setCurrent({url: social.linkedin.url, icon: social.linkedin.icon})
        }
    }, [isFacebook, isInstagram, isLinkedin, social.facebook.url, social.facebook.icon, social.instagram.url,
        social.instagram.icon, social.linkedin.url, social.linkedin.icon])

    return (
        <CircleLink href={current && current.url} className="social-link" target="_blank">
            <svg
                style={styles.svg}
                width={`${size ? size + 'px' : '15px'}`}
                height={`${size ? size + 'px' : '15px'}`}
                viewBox="0 0 1024 1024"
                color={"#000"}
                >
                <path
                    style={styles.path}
                    d={current && current.icon}
                ></path>
            </svg>
        </CircleLink>
    )
}

export default SocialIcon