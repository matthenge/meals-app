import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen 
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.primary
    }},
    Favorites: {
        screen: FavNavigator, navigationOptions: {
            //tabBarLabel overwrites the default in line 49
            tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.accent
        }}
};


const MealsFavTabNavigator = Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    // shifting effect shows the lable of the active tab only.
    // When false all tab labels are shown and the tabBarColor on line 58 does not work
    shifting: true,
    // barStyle is used when shifting is false ant the tabBarColor feature does not work.
    // It sets the bar to a specific color and other styles
    barStyle: {
        backgroundColor: Colors.primary
    }

}) 
: createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accent
    }
});

export default createAppContainer(MealsFavTabNavigator);
