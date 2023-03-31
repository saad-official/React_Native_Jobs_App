import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import { COLORS, icons, SIZES } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Company from "../../components/jobdetails/company/Company";
import JobTabs from "../../components/jobdetails/tabs/Tabs";
import About from "../../components/jobdetails/about/About";
import { useCallback, useState } from "react";
import Specifices from "../../components/jobdetails/specifics/Specifics";
import JobFooter from "../../components/jobdetails/footer/Footer";
const tabs = ["About", "Qualifications", "Responsibilities"];
const Jobdetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[1]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifices
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return <About info={data[0].job_description ?? ["N/A"]} />;

      case "Responsibilities":
        return (
          <Specifices
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_goggle_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default Jobdetails;
