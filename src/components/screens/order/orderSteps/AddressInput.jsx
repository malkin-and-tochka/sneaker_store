import {View,} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const AddressInput = ({setAddress, address}) => {
    const addresses = ['г. Минск, Гикало 9', 'г. Минск Рокоссовского 29']

    return (
        <View style={{borderWidth: 2, borderRadius: 5}}>
            <Picker
                selectedValue={address}
                onValueChange={(itemValue) => setAddress(itemValue)}
            >
                {addresses.map((address, index) => (
                    <Picker.Item key={index} label={address} value={address}/>
                ))}
            </Picker>
        </View>
    );
};

export default AddressInput;
