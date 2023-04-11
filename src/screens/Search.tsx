import { useEffect, useState, useRef } from 'react';
import { Image, Platform, Animated } from 'react-native';
import styled from 'styled-components/native';
import { SearchBar, Button } from '@rneui/themed';
import { useDebounce } from 'use-debounce';

const FADE_DURATION = 200;

export default function Search() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [debouncedSearch] = useDebounce(search, 200);

  const [loading, setLoading] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();
  };

  function reset() {
    fadeAnim.resetAnimation();
    setResults([]);
    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      fadeAnim.setValue(0);
    }
  }, [loading]);

  useEffect(() => {
    setLoading(false);
    fadeIn();
  }, [results]);

  useEffect(() => {
    if (search) {
      setLoading(true);
    } else {
      reset();
    }
  }, [search]);

  useEffect(() => {
    reset();

    if (debouncedSearch) {
      searchTeams();
    }
  }, [debouncedSearch]);

  async function searchTeams() {
    const response = await fetch(`${teamEndpoint}/${search}?limit=2`);
    const results: any[] = await response.json();

    for await (const result of results) {
      const imgUrl = result.team?.logo;

      const response = await fetch(imgUrl);
      const blob = await response.blob();

      result.logo = URL.createObjectURL(blob);
    }

    setResults(results);
  }

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      {loading ? (
        <Button
          type="clear"
          loading={true}
          loadingProps={{
            color: 'grey',
          }}
        />
      ) : (
        results.map((result) => (
          <Animated.View key={result._id} style={{ opacity: fadeAnim }}>
            <Result
              style={{
                backgroundColor: !loading ? 'white' : 'transparent',
              }}
            >
              <Image
                source={{ uri: result.logo }}
                style={{ height: 24, width: 24 }}
              />
              <Name>{result.team?.name}</Name>
            </Result>
          </Animated.View>
        ))
      )}
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
        platform="ios"
        containerStyle={{ backgroundColor: 'transparent' }}
      />
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
  justify-content: flex-end;
  gap: 12px;
  flex: 1;
  background-color: #eeeeee;
`;

const Result = styled.View`
  padding-left: 12px;
  margin-left: 12px;
  margin-right: 12px;
  height: 54px;
  gap: 12px;
  flex-flow: row;
  align-items: center;
  border-radius: 8px;
`;

const Name = styled.Text`
  font-size: 16px;
`;

const teamEndpoint = `https://tripled.hu/foci/api/team`;
