import { StyleSheet } from "react-native";

export const AppDefaultParams:any = {
    COLORS: {
        DARK_MAIN: '#2D3132',
        LIGHT_MAIN: '#F4F6F6',
        //A400 -> https://materialui.co/colors/
        PALETTE: [
            "#FF1744", 
            "#F50057", 
            "#D500F9", 
            "#651FFF", 
            "#3D5AFE", 
            "#2979FF", 
            "#00B0FF", 
            "#00E5FF",
            "#1DE9B6", 
            "#00E676", 
            "#76FF03", 
            "#C6FF00", 
            "#FFEA00", 
            "#FFC400", 
            "#FF9100", 
            "#FF3D00",
        ]
    }
}

export const AppStyles = StyleSheet.create({
    fabContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        right: 24,
        bottom: 48,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    fabButton: {
        backgroundColor: AppDefaultParams.COLORS.DARK_MAIN,
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',   
    }
})

export default AppStyles;