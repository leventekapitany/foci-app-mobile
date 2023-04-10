import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { SearchBar } from '@rneui/themed';

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [result, setResults] = useState<any[]>([]);

  console.log(result);

  useEffect(() => {
    if (search) {
      searchTeams(search);
    } else setResults([]);
  }, [search]);

  async function searchTeams(search: string) {
    const response = await fetch(`${teamEndpoint}/${search}`);
    const result = await response.json();

    setResults(result);
  }

  return (
    <Container>
      {result.map((result) => (
        <View>
          <Text>{result.team?.name}</Text>
          <Image
            source={{ uri: result.team?.logo }}
            style={{ height: 30, width: 30 }}
          />
        </View>
      ))}
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

const Container = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

const teamEndpoint = `https://tripled.hu/foci/api/team`;
