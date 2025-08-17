import React from 'react';

interface ChatIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const ChatIcon: React.FC<ChatIconProps> = ({ 
  width = 82, 
  height = 83, 
  className = "" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 82 83" 
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_df_2004_745)">
        <mask id="mask0_2004_745" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="9" y="1" width="64" height="64">
          <circle cx="41" cy="33" r="32" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_2004_745)">
          <g filter="url(#filter1_i_2004_745)">
            <circle cx="40.9995" cy="33.0002" r="41.6807" fill="#D013DB"/>
          </g>
          <g style={{mixBlendMode:'screen'}} filter="url(#filter2_df_2004_745)">
            <path d="M70.669 57.7638C70.669 55.714 57.4257 62.6692 41.0892 62.6692C24.7527 62.6692 11.5093 55.714 11.5093 57.7638C11.5093 59.8136 24.7527 61.4753 41.0892 61.4753C57.4257 61.4753 70.669 59.8136 70.669 57.7638ZM15.752 57.7638C15.752 56.008 27.0958 63.4759 41.0892 63.4759C55.0825 63.4759 66.4264 56.008 66.4264 57.7638C66.4264 59.5196 55.0825 60.943 41.0892 60.943C27.0958 60.943 15.752 59.5196 15.752 57.7638Z" fill="#F9F8FA" style={{mixBlendMode:'overlay'}} shapeRendering="crispEdges"/>
            <path d="M41.0894 63.5648C46.681 63.5648 51.8484 62.3732 56.0396 61.055C58.2265 60.8941 60.2342 60.6995 62.0162 60.4759C64.6943 60.1399 66.866 59.7394 68.3697 59.2933C69.1209 59.0705 69.711 58.8348 70.1148 58.5872C70.5123 58.3434 70.7573 58.0703 70.7574 57.764C70.7574 57.6068 70.6909 57.4843 70.5621 57.4056C70.4408 57.3317 70.2712 57.3003 70.0689 57.2972C69.6624 57.2911 69.0717 57.3977 68.3238 57.5794C67.7699 57.7141 67.1244 57.894 66.3951 58.1019C66.4715 57.995 66.5151 57.8832 66.5152 57.764C66.5152 57.6973 66.5019 57.6344 66.4703 57.5804C66.4384 57.5261 66.3913 57.4858 66.3345 57.4583C66.2249 57.4054 66.0748 57.3988 65.9019 57.4173C65.5528 57.4548 65.0461 57.6061 64.4058 57.8324C63.7632 58.0595 62.9769 58.3656 62.067 58.7171C61.1565 59.0689 60.1203 59.4668 58.9752 59.8783C58.9069 59.9028 58.8381 59.9269 58.7691 59.9515C54.2075 60.5098 47.9696 60.8538 41.0894 60.8539C34.2084 60.8539 27.9695 60.5099 23.4078 59.9515C23.3391 59.927 23.2706 59.9027 23.2027 59.8783C22.0576 59.4668 21.0214 59.0689 20.1109 58.7171C19.2012 58.3656 18.4155 58.0595 17.773 57.8324C17.1326 57.606 16.6251 57.4547 16.2759 57.4173C16.1032 57.3988 15.9538 57.4056 15.8443 57.4583C15.7875 57.4858 15.7405 57.5261 15.7086 57.5804C15.6769 57.6344 15.6636 57.6973 15.6636 57.764C15.6637 57.8831 15.7064 57.9951 15.7828 58.1019C15.0538 57.8941 14.4087 57.714 13.855 57.5794C13.1068 57.3976 12.5155 57.291 12.1089 57.2972C11.9066 57.3003 11.7371 57.3316 11.6158 57.4056C11.487 57.4843 11.4205 57.6068 11.4205 57.764C11.4206 58.0704 11.6663 58.3434 12.064 58.5872C12.4677 58.8348 13.0572 59.0705 13.8082 59.2933C15.3118 59.7394 17.4837 60.1399 20.1617 60.4759C21.9435 60.6995 23.9515 60.8941 26.1382 61.055C30.3296 62.3733 35.4976 63.5648 41.0894 63.5648ZM19.3345 59.3031C18.7444 59.179 18.22 59.0504 17.7681 58.9164C17.4056 58.8088 17.0918 58.6971 16.8277 58.5853C17.5927 58.807 18.4309 59.0479 19.3345 59.3031ZM62.8433 59.3031C63.7469 59.0479 64.5851 58.807 65.3502 58.5853C65.0861 58.6971 64.7722 58.8088 64.4097 58.9164C63.9578 59.0504 63.4336 59.179 62.8433 59.3031ZM24.0435 60.3636C23.6163 60.2603 23.1977 60.1555 22.7877 60.0511C22.911 60.0673 23.0357 60.0841 23.1617 60.0999C23.2299 60.1085 23.2988 60.1169 23.3677 60.1253C23.5891 60.2042 23.8143 60.2841 24.0435 60.3636ZM58.1353 60.3626C58.3641 60.2832 58.5891 60.2041 58.8101 60.1253C58.8792 60.1169 58.9479 60.1085 59.0162 60.0999C59.1425 60.0841 59.2675 60.0673 59.3912 60.0511C58.9812 60.1555 58.5624 60.2594 58.1353 60.3626ZM41.0894 62.5804C36.2452 62.5804 31.6729 61.9664 27.6373 61.1585C31.6738 61.4175 36.2461 61.5638 41.0894 61.5638C45.9321 61.5638 50.5035 61.4174 54.5396 61.1585C50.5044 61.9663 45.933 62.5804 41.0894 62.5804Z" stroke="#F9F8FA" strokeWidth="0.177347" shapeRendering="crispEdges"/>
          </g>
          <g filter="url(#filter3_di_2004_745)">
            <circle cx="41.0894" cy="28.2492" r="33.8824" fill="url(#paint0_linear_2004_745)" shapeRendering="crispEdges"/>
            <circle cx="41.0894" cy="28.2492" r="34.0597" stroke="url(#paint1_linear_2004_745)" strokeOpacity="0.5" strokeWidth="0.354694" shapeRendering="crispEdges"/>
          </g>
          <g filter="url(#filter4_f_2004_745)">
            <path d="M72.1037 32.8207C72.1037 28.7361 71.2992 24.6915 69.7361 20.9178C68.173 17.1441 65.8819 13.7153 62.9937 10.8271C60.1054 7.93882 56.6766 5.64774 52.9029 4.08463C49.1292 2.52153 45.0847 1.71701 41.0001 1.71701C36.9155 1.71701 32.8709 2.52153 29.0972 4.08463C25.3235 5.64774 21.8947 7.93882 19.0065 10.8271C16.1182 13.7153 13.8272 17.1441 12.264 20.9178C10.7009 24.6915 9.89642 28.7361 9.89642 32.8207C26.3894 41.8739 55.79 41.605 72.1037 32.8207Z" fill="#3A0074"/>
          </g>
          <g filter="url(#filter5_d_2004_745)">
            <path d="M24.8336 12.6525C26.4686 8.57712 27.6965 6.91088 30.2117 4.58527C25.7788 5.48077 22.6553 7.46153 17.8887 12.4617C15.6627 14.7968 13.8101 17.4927 12.6303 20.4953C10.6084 25.6408 10.1526 29.781 10.5815 36.3164C10.6237 28.1925 11.7414 23.7864 16.6767 16.3276C18.0668 14.0587 19.2271 12.9635 24.8336 12.6525Z" fill="url(#paint2_linear_2004_745)" shapeRendering="crispEdges"/>
          </g>
          <g filter="url(#filter6_d_2004_745)">
            <path d="M59.9643 12.0131C58.8932 7.75464 58.1207 10.3101 55.9418 7.66686C60.2136 9.15144 63.0417 11.535 67.0912 17.1318C68.9823 19.7455 70.4548 22.6664 71.2193 25.8006C72.5295 31.1716 72.4234 35.3354 71.1179 41.7534C72.1706 33.6979 71.6566 29.1815 67.7713 21.1257C66.6996 18.6902 65.4777 13.0767 59.9643 12.0131Z" fill="url(#paint3_linear_2004_745)"/>
          </g>
          <g style={{mixBlendMode:'screen'}} filter="url(#filter7_dif_2004_745)">
            <path d="M49.5142 12.1153C49.5142 12.9074 45.7017 13.5495 40.9987 13.5495C36.2958 13.5495 32.4833 12.9074 32.4833 12.1153C32.4833 11.3233 36.2958 10.6812 40.9987 10.6812C45.7017 10.6812 49.5142 11.3233 49.5142 12.1153ZM33.7047 12.1153C33.7047 12.7938 36.9704 13.3438 40.9987 13.3438C45.0271 13.3438 48.2928 12.7938 48.2928 12.1153C48.2928 11.4369 45.0271 10.8869 40.9987 10.8869C36.9704 10.8869 33.7047 11.4369 33.7047 12.1153Z" fill="#7006CE"/>
          </g>
          <g style={{mixBlendMode:'screen'}} filter="url(#filter8_if_2004_745)">
            <path d="M45.7504 12.1152C45.7504 12.5113 43.784 12.8323 41.3583 12.8323C38.9326 12.8323 36.9661 12.5113 36.9661 12.1152C36.9661 11.7192 38.9326 11.3982 41.3583 11.3982C43.784 11.3982 45.7504 11.7192 45.7504 12.1152ZM37.5961 12.1152C37.5961 12.4545 39.2805 12.7295 41.3583 12.7295C43.4361 12.7295 45.1205 12.4545 45.1205 12.1152C45.1205 11.776 43.4361 11.501 41.3583 11.501C39.2805 11.501 37.5961 11.776 37.5961 12.1152Z" fill="#7006CE"/>
          </g>
          <g style={{mixBlendMode:'screen'}} filter="url(#filter9_dif_2004_745)">
            <path d="M51.487 10.3221C51.487 11.3122 46.7916 12.1148 40.9996 12.1148C35.2076 12.1148 30.5122 11.3122 30.5122 10.3221C30.5122 9.33198 35.2076 8.52936 40.9996 8.52936C46.7916 8.52936 51.487 9.33198 51.487 10.3221ZM32.0164 10.3221C32.0164 11.1702 36.0383 11.8577 40.9996 11.8577C45.9609 11.8577 49.9828 11.1702 49.9828 10.3221C49.9828 9.47399 45.9609 8.78649 40.9996 8.78649C36.0383 8.78649 32.0164 9.47399 32.0164 10.3221Z" fill="#7006CE"/>
          </g>
          <g opacity="0.1" filter="url(#filter10_f_2004_745)">
            <path d="M38.8479 57.7393L32.3045 28.6076L21.1896 25.7393L27.3745 19.913L33.9179 13.3695L53.9964 18.0306L49.0664 28.6076L44.1364 57.7393H38.8479Z" fill="#B910CB"/>
          </g>
          <g filter="url(#filter11_f_2004_745)">
            <ellipse cx="40.9997" cy="5.39188" rx="20.3473" ry="6.18488" fill="#5B0DF8" fillOpacity="0.5"/>
          </g>
          <circle cx="38.9163" cy="58.7954" r="0.0774809" fill="white"/>
          <circle cx="36.8229" cy="54.6079" r="0.0774809" fill="white"/>
          <circle cx="42.581" cy="51.9904" r="0.0774809" fill="white"/>
          <circle cx="40.487" cy="55.1312" r="0.0774809" fill="white"/>
          <circle cx="44.151" cy="57.7486" r="0.0774809" fill="white"/>
          <circle cx="47.8148" cy="50.9431" r="0.0774809" fill="white"/>
          <circle cx="48.864" cy="56.7012" r="0.0774809" fill="white"/>
          <circle cx="39.9635" cy="51.9904" r="0.0774809" fill="white"/>
          <circle cx="46.2448" cy="55.1312" r="0.0774809" fill="white"/>
          <circle cx="45.1981" cy="49.8963" r="0.0774809" fill="white"/>
          <circle cx="44.151" cy="54.6079" r="0.0774809" fill="white"/>
          <circle cx="34.2043" cy="57.7486" r="0.0774809" fill="white"/>
          <circle cx="35.2528" cy="47.8022" r="0.0774809" fill="white"/>
          <circle cx="46.7682" cy="61.4128" r="0.0774809" fill="white"/>
          <circle cx="32.6342" cy="51.9904" r="0.0774809" fill="white"/>
          <g opacity="0.5">
            <circle cx="23.2116" cy="58.7954" r="0.0774809" fill="white"/>
            <circle cx="21.1181" cy="54.6078" r="0.0774809" fill="white"/>
            <circle cx="26.8759" cy="51.9904" r="0.0774809" fill="white"/>
            <circle cx="24.7819" cy="55.1312" r="0.0774809" fill="white"/>
            <circle cx="28.4464" cy="57.7486" r="0.0774809" fill="white"/>
            <circle cx="32.1109" cy="50.9431" r="0.0774809" fill="white"/>
            <circle cx="33.159" cy="56.7012" r="0.0774809" fill="white"/>
            <circle cx="24.2587" cy="51.9904" r="0.0774809" fill="white"/>
            <circle cx="30.5399" cy="55.1312" r="0.0774809" fill="white"/>
            <circle cx="29.4931" cy="49.8963" r="0.0774809" fill="white"/>
            <circle cx="28.4464" cy="54.6078" r="0.0774809" fill="white"/>
            <circle cx="18.4998" cy="57.7486" r="0.0774809" fill="white"/>
            <circle cx="19.547" cy="47.8022" r="0.0774809" fill="white"/>
            <circle cx="31.0631" cy="61.4128" r="0.0774809" fill="white"/>
            <circle cx="16.9293" cy="51.9904" r="0.0774809" fill="white"/>
          </g>
          <g opacity="0.5">
            <circle cx="23.2116" cy="58.7954" r="0.0774809" fill="white"/>
            <circle cx="21.1181" cy="54.6078" r="0.0774809" fill="white"/>
            <circle cx="26.8759" cy="51.9904" r="0.0774809" fill="white"/>
            <circle cx="24.7819" cy="55.1312" r="0.0774809" fill="white"/>
            <circle cx="28.4464" cy="57.7486" r="0.0774809" fill="white"/>
            <circle cx="32.1109" cy="50.9431" r="0.0774809" fill="white"/>
            <circle cx="33.159" cy="56.7012" r="0.0774809" fill="white"/>
            <circle cx="24.2587" cy="51.9904" r="0.0774809" fill="white"/>
            <circle cx="30.5399" cy="55.1312" r="0.0774809" fill="white"/>
            <circle cx="29.4931" cy="49.8963" r="0.0774809" fill="white"/>
            <circle cx="28.4464" cy="54.6078" r="0.0774809" fill="white"/>
            <circle cx="18.4998" cy="57.7486" r="0.0774809" fill="white"/>
            <circle cx="19.547" cy="47.8022" r="0.0774809" fill="white"/>
            <circle cx="31.0631" cy="61.4128" r="0.0774809" fill="white"/>
            <circle cx="16.9293" cy="51.9904" r="0.0774809" fill="white"/>
          </g>
          <g opacity="0.5">
            <circle cx="68.5077" cy="36.1471" r="0.0774809" fill="white"/>
            <circle cx="66.4147" cy="31.9596" r="0.0774809" fill="white"/>
            <circle cx="72.172" cy="29.3422" r="0.0774809" fill="white"/>
            <circle cx="70.0795" cy="32.4829" r="0.0774809" fill="white"/>
            <circle cx="69.5553" cy="29.3422" r="0.0774809" fill="white"/>
            <circle cx="63.7975" cy="35.1004" r="0.0774809" fill="white"/>
            <circle cx="64.8446" cy="25.154" r="0.0774809" fill="white"/>
            <circle cx="62.227" cy="29.3422" r="0.0774809" fill="white"/>
          </g>
          <g opacity="0.5">
            <circle cx="22.1537" cy="42.9382" r="0.0774809" fill="white"/>
            <circle cx="20.0606" cy="38.75" r="0.0774809" fill="white"/>
            <circle cx="25.8187" cy="36.1326" r="0.0774809" fill="white"/>
            <circle cx="23.7247" cy="39.274" r="0.0774809" fill="white"/>
            <circle cx="27.3888" cy="41.8915" r="0.0774809" fill="white"/>
            <circle cx="31.0536" cy="35.0859" r="0.0774809" fill="white"/>
            <circle cx="32.0995" cy="40.8441" r="0.0774809" fill="white"/>
            <circle cx="23.1997" cy="36.1326" r="0.0774809" fill="white"/>
            <circle cx="29.4825" cy="39.274" r="0.0774809" fill="white"/>
            <circle cx="28.4359" cy="34.0391" r="0.0774809" fill="white"/>
            <circle cx="27.3888" cy="38.75" r="0.0774809" fill="white"/>
            <circle cx="17.4423" cy="41.8915" r="0.0774809" fill="white"/>
            <circle cx="18.489" cy="31.945" r="0.0774809" fill="white"/>
            <circle cx="30.0059" cy="45.5557" r="0.0774809" fill="white"/>
            <circle cx="15.872" cy="36.1326" r="0.0774809" fill="white"/>
          </g>
          <g opacity="0.2">
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 38.3133 40.5529)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 36.2203 44.7412)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 41.9777 47.3586)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 39.8844 44.2172)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 43.548 41.6003)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 47.2131 48.4053)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 48.2607 42.6471)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 39.3599 47.3586)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 45.6431 44.2172)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 44.5959 49.4521)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 43.548 44.7412)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 33.6027 41.6003)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 34.6492 51.5461)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 46.1663 37.9355)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 32.0326 47.3586)" fill="white"/>
          </g>
          <g opacity="0.2">
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 31.5096 39.5062)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 29.4156 43.6944)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 35.1746 46.3119)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 33.0806 43.1704)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 36.7449 40.5529)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 40.4095 47.3586)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 41.4561 41.6003)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 32.5563 46.3119)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 38.8384 43.1704)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 37.7904 48.4053)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 36.7449 43.6944)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 26.798 40.5529)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 27.8456 50.4994)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 39.3618 36.8888)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 25.2279 46.3119)" fill="white"/>
          </g>
          <g opacity="0.2">
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 13.7117 43.6945)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 11.6187 47.882)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 17.3765 50.5001)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 15.2828 47.3587)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 18.9471 44.7412)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 22.6115 51.5468)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 23.6583 45.7886)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 14.7583 50.5001)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 21.0406 47.3587)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 19.994 52.5936)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 18.9471 47.882)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 9 44.7412)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 10.0476 54.6876)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 21.5646 41.077)" fill="white"/>
          </g>
          <g opacity="0.2">
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 18.9466 43.6945)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 16.8523 47.8827)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 22.6111 50.5001)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 20.5161 47.3587)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 24.1812 44.7412)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 27.8459 51.5468)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 28.8928 45.7886)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 19.9937 50.5001)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 26.275 47.3587)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 25.2283 52.5936)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 24.1812 47.8827)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 14.2346 44.7412)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 15.2812 54.6876)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 26.7984 41.077)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 12.6646 50.5001)" fill="white"/>
          </g>
          <g opacity="0.6">
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 55.59 46.3118)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 53.4953 50.5)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 59.2541 53.1175)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 57.1601 49.9767)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 60.8246 47.3586)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 64.489 54.1642)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 65.5358 48.406)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 56.6359 53.1175)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 62.9179 49.9767)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 61.8698 55.2109)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 60.8246 50.5)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 50.8773 47.3586)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 51.9252 57.305)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 63.4424 43.6944)" fill="white"/>
            <circle cx="0.0774809" cy="0.0774809" r="0.0774809" transform="matrix(1 0 0 -1 49.3073 53.1175)" fill="white"/>
          </g>
          <g style={{mixBlendMode:'screen'}}>
            <circle cx="41" cy="33" r="32" fill="#5596F8" fillOpacity="0.78"/>
          </g>
          <path d="M44.6667 29.3331V22H30V29.3331L44.6667 29.3331Z" fill="url(#paint4_linear_2004_745)"/>
          <path d="M44.6664 36.6662C40.6163 36.6662 37.333 39.9494 37.333 43.9994L30.0009 43.9997L30.0009 43.8104C30.1017 35.8289 36.5782 29.3837 44.572 29.3334L52 29.3337V44H44.6667L44.6664 36.6662Z" fill="url(#paint5_linear_2004_745)"/>
        </g>
      </g>
      <defs>
        <filter id="filter0_df_2004_745" x="0.0377922" y="0.893592" width="81.9244" height="82.0308" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="8.96221"/>
          <feGaussianBlur stdDeviation="4.4811"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.72549 0 0 0 0 0.0627451 0 0 0 0 0.796078 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
          <feGaussianBlur stdDeviation="0.0532041" result="effect2_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter1_i_2004_745" x="-0.681213" y="-8.68045" width="83.3613" height="83.3614" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="3.72428" operator="erode" in="SourceAlpha" result="effect1_innerShadow_2004_745"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="9.6654"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.977083 0 0 0 0 0.583333 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2004_745"/>
        </filter>
        <filter id="filter2_df_2004_745" x="9.75358" y="55.098" width="62.6711" height="9.6016" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="-0.532041"/>
          <feGaussianBlur stdDeviation="0.789193"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.977083 0 0 0 0 0.583333 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
          <feGaussianBlur stdDeviation="0.203949" result="effect2_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter3_di_2004_745" x="6.85236" y="-5.98788" width="68.4741" height="69.1835" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="1.77347" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2004_745"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="0.354694"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="5.49775" operator="erode" in="SourceAlpha" result="effect2_innerShadow_2004_745"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="4.93911"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.72549 0 0 0 0 0.0627451 0 0 0 0 0.796078 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2004_745"/>
        </filter>
        <filter id="filter4_f_2004_745" x="3.72475" y="-4.45466" width="74.5506" height="50.1364" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="3.08583" result="effect1_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter5_d_2004_745" x="4.70578" y="-0.433649" width="31.2343" height="43.1877" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="2.86415"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.331701 0 0 0 0 0.587354 0 0 0 0 0.970833 0 0 0 0.2 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
        </filter>
        <filter id="filter6_d_2004_745" x="50.2135" y="2.64795" width="27.6658" height="45.5432" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="2.86415"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.331701 0 0 0 0 0.587354 0 0 0 0 0.970833 0 0 0 0.2 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
        </filter>
        <filter id="filter7_dif_2004_745" x="31.7739" y="9.97176" width="18.893" height="5.08518" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.354694" dy="0.709387"/>
          <feGaussianBlur stdDeviation="0.39903"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.662745 0 0 0 0 0.0117647 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="0.576377"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.21 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2004_745"/>
          <feGaussianBlur stdDeviation="0.354694" result="effect3_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter8_if_2004_745" x="36.4341" y="10.8661" width="9.84838" height="2.6756" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="0.576377"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.21 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2004_745"/>
          <feGaussianBlur stdDeviation="0.26602" result="effect2_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter9_dif_2004_745" x="27.8875" y="5.90462" width="26.2243" height="8.83489" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.354694" dy="0.709387"/>
          <feGaussianBlur stdDeviation="0.39903"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.662745 0 0 0 0 0.0117647 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_745"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_745" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.709387"/>
          <feGaussianBlur stdDeviation="0.576377"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.21 0"/>
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2004_745"/>
          <feGaussianBlur stdDeviation="1.31237" result="effect3_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter10_f_2004_745" x="13.6701" y="5.85003" width="47.8457" height="59.4088" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="3.75975" result="effect1_foregroundBlur_2004_745"/>
        </filter>
        <filter id="filter11_f_2004_745" x="12.5831" y="-8.86228" width="56.8333" height="28.5083" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="4.03464" result="effect1_foregroundBlur_2004_745"/>
        </filter>
        <linearGradient id="paint0_linear_2004_745" x1="41.1848" y1="51.251" x2="41.1848" y2="58.5047" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7006CE"/>
          <stop offset="1" stopColor="#390368" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2004_745" x1="41.0894" y1="-5.63318" x2="41.0894" y2="62.1315" gradientUnits="userSpaceOnUse">
          <stop stopColor="#190131"/>
          <stop offset="0.545" stopColor="#C39FFF"/>
          <stop offset="1" stopColor="#F995FF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_2004_745" x1="22.0867" y1="12.2939" x2="29.7058" y2="18.1203" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="#5596F8" stopOpacity="0.05"/>
        </linearGradient>
        <linearGradient id="paint3_linear_2004_745" x1="63.3134" y1="14.6216" x2="75.5204" y2="8.96758" gradientUnits="userSpaceOnUse">
          <stop offset="0.83" stopColor="white"/>
          <stop offset="1" stopColor="#5596F8"/>
        </linearGradient>
        <linearGradient id="paint4_linear_2004_745" x1="41" y1="22" x2="41" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="paint5_linear_2004_745" x1="41" y1="22" x2="41" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ChatIcon;